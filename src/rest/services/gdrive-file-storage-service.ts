import * as FileSystem from 'expo-file-system'
import { fetch } from 'expo/fetch'

import type { FileStorageService } from '@/core/interfaces/services'
import type { Id } from '@/core/domain/structures'
import { RestResponse } from '@/core/responses'
import { HTTP_STATUS_CODE } from '@/core/constants'

const GDRIVE_API_URL =
  'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable'

export const GDriveFileStorageService = (accessToken: string): FileStorageService => {
  return {
    async upload(fileUri: string) {
      try {
        const fileInfo = await FileSystem.getInfoAsync(fileUri)
        if (!fileInfo.exists) {
          return new RestResponse({
            statusCode: HTTP_STATUS_CODE.badRequest,
            errorMessage: 'Arquivo não encontrado',
          })
        }

        const fileName = fileInfo.uri.split('/').pop()

        const initiateResponse = await fetch(GDRIVE_API_URL, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: JSON.stringify({
            name: fileName,
          }),
        })

        if (initiateResponse.status !== 200) {
          return new RestResponse({
            statusCode: initiateResponse.status,
            errorMessage: 'Falha ao iniciar o upload com o Google.',
          })
        }

        const uploadUrl = initiateResponse.headers.get('Location')
        if (!uploadUrl)
          return new RestResponse({
            statusCode: HTTP_STATUS_CODE.badRequest,
            errorMessage: 'Arquivo não encontrado',
          })

        const uploadResponse = await FileSystem.uploadAsync(uploadUrl, fileUri, {
          httpMethod: 'PUT',
          headers: {
            'Content-Length': `${fileInfo.size}`,
          },
          uploadType: FileSystem.FileSystemUploadType.BINARY_CONTENT,
        })

        if (uploadResponse.status === 200) {
          return new RestResponse({ statusCode: HTTP_STATUS_CODE.ok })
        } else {
          return new RestResponse({
            statusCode: HTTP_STATUS_CODE.badRequest,
            errorMessage: 'Arquivo não encontrado',
          })
        }
      } catch (error) {
        console.error('Error on google backup', error)
        return new RestResponse({
          statusCode: HTTP_STATUS_CODE.serverError,
          errorMessage: '',
        })
      }
    },

    async read(fileName: string) {
      const params = new URLSearchParams({
        q: `name contains '${fileName}'`,
        orderBy: 'modifiedTime desc',
        pageSize: '1',
        fields: 'files(id,name,modifiedTime)',
      })

      const response = await fetch(
        `https://www.googleapis.com/drive/v3/files?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      )

      if (!response.ok) {
        console.warn('Error on google backup', response.status)
        return new RestResponse({
          statusCode: response.status,
          errorMessage: 'Not implemented',
        })
      }

      const data = await response.json()

      if (!data.files || data.files.length === 0) {
        return new RestResponse({
          statusCode: HTTP_STATUS_CODE.notFound,
          errorMessage: 'Arquivo não encontrado',
        })
      }
      const fileId = String(data.files[0].id)
      const dto = {
        id: fileId,
        name: data.files[0].name,
        size: data.files[0].size,
        createdAt: new Date(String(data.files[0].modifiedTime)),
      }
      return new RestResponse({ body: dto })

      // try {
      //   const fileMediaResponse = await fetch(
      //     `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      //     {
      //       headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //       },
      //     },
      //   )

      //   if (!fileMediaResponse.ok) {
      //     console.warn('Error on google backup', fileMediaResponse.status)
      //     return new RestResponse({
      //       statusCode: fileMediaResponse.status,
      //       errorMessage: 'Not implemented',
      //     })
      //   }

      //   const data = await fileMediaResponse.text()

      //   return new RestResponse({ body: data })
      // } catch (error) {
      //   console.warn('Error on google backup', error)
      //   return new RestResponse({
      //     statusCode: 500,
      //     errorMessage: 'Falha ao ler o arquivo.',
      //   })
      // }
    },

    async getFileById(fileId: Id) {
      try {
        const fileMediaResponse = await fetch(
          `https://www.googleapis.com/drive/v3/files/${fileId.value}?alt=media`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          },
        )

        if (!fileMediaResponse.ok) {
          console.warn('Error on google backup', fileMediaResponse.status)
          return new RestResponse({
            statusCode: fileMediaResponse.status,
            errorMessage: 'Not implemented',
          })
        }

        const data = await fileMediaResponse.text()

        return new RestResponse({ body: data })
      } catch (error) {
        console.warn('Error on google backup', error)
        return new RestResponse({
          statusCode: 500,
          errorMessage: 'Falha ao ler o arquivo.',
        })
      }
    },
  }
}
