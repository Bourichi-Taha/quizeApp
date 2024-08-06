FROM alpine

WORKDIR /app

COPY android/app/build/outputs/apk/release/app-release.apk /app/app-release.apk

CMD ["tail", "-f", "/dev/null"]
