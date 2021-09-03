FROM python:3.7-alpine

ENV PYTHONUNBUFFERED 1

COPY ./requirements.txt /requirements.txt

RUN pip install -r /requirements.txt
RUN mkdir /the_loop_backend
WORKDIR /the_loop_backend
COPY ./the_loop_backend /the_loop_backend/

RUN adduser -D user
USER user

