FROM scratch
ADD server /src/services/
ADD config/config.json /src/services/config/config.json
WORKDIR /src/services
CMD ["/src/services/server"]