FROM envoyproxy/envoy:latest
RUN apt-get update
COPY envoy.yaml /etc/envoy.yaml
COPY turbota/fullchain.pem /etc/turbota/fullchain.pem
COPY turbota/privkey.pem /etc/turbota/privkey.pem
CMD /usr/local/bin/envoy -c /etc/envoy.yaml