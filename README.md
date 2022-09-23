# storage-system

<hr>

# Extensiones disponibles:

- aac
- abw
- arc
- avi
- azw
- bin
- bmp
- bz
- bz2
- csh
- css
- csv
- doc
- epub
- gif
- htm
- html
- ico
- ics
- jar
- jpeg
- jpg
- js
- json
- mid
- midi
- mpeg
- mpkg
- odp
- ods
- odt
- oga
- ogv
- ogx
- otf
- png
- pdf
- ppt
- rar
- rtf
- sh
- svg
- swf
- tar
- tif
- tiff
- ttf
- txt
- vsd
- wav
- weba
- webm
- webp
- woff
- woff2
- xhtml
- xls
- xlsx
- xml
- xul
- zip
- 3gp
- 3g2
- 7z

<hr>

# Endpoints:

- (GET) /api/file/:filename - Obtiene el archivo solicitado.
- (POST) /api/file - Sube un archivo. Se debe enviar en un multipart/form-data. El archivo debe estar en la key llamada file. Debe contener el header system-identifier-authorization con el TOKEN de autenticación. La respuesta es un JSON con el siguiente formato:
  ```json
  {
  	"createdAt": "2020-01-01T09:00:00.000Z",
  	"newFilename": "99xx999x-99x9-9x99-99x9-x9999x99xxx9.jpeg"
  }
  ```
- (POST) /api/file/json - Sube un archivo. Se debe enviar en un application/json. El archivo codificado en base64 (no debe contener la parte inicial ...base64,) debe estar en la key llamada file, el nombre del archivo en la key llamada filename y la extensión (sin el punto) en la key llamada extension. Debe contener el header system-identifier-authorization con el TOKEN de autenticación. La respuesta es un JSON con el siguiente formato:
  ```json
  {
  	"createdAt": "2020-01-01T09:00:00.000Z",
  	"newFilename": "99xx999x-99x9-9x99-99x9-x9999x99xxx9.jpeg"
  }
  ```
- (DELETE) /api/file/:filename - Elimina el archivo solicitado. Debe contener el header system-identifier-authorization con el TOKEN de autenticación.
