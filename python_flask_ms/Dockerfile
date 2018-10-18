FROM python:3.7-alpine

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

EXPOSE 4000
ENTRYPOINT [ "python" ]

CMD [ "app/server.py" ]

