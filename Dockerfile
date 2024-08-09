FROM alpine

WORKDIR /app

COPY android/app/build/outputs /app/outputs

CMD ["tail", "-f", "/dev/null"]
