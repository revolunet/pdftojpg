# pdftojpg

HTTP microservice on top of [gm](https://github.com/aheckmann/gm)

return a JPG of the first page of the given PDF.

## Deploy

[![Deploy to now](https://deploy.now.sh/static/button.svg)](https://deploy.now.sh/?repo=https://github.com/revolunet/pdftojpg)

## Usage

```sh
curl -X POST http://127.0.0.1:8888/convert -H "Content-Type: application/pdf" --data-binary "@/path/to/test.pdf" -o out.jpg
```