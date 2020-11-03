FROM envoyproxy/envoy:latest
RUN apt-get update
COPY turbota/fullchain.pem /etc/turbota/fullchain.pem
COPY turbota/privkey.pem /etc/turbota/privkey.pem
COPY alllead/fullchain.pem /etc/alllead/fullchain.pem
COPY alllead/privkey.pem /etc/alllead/privkey.pem
COPY envoy.yaml /etc/envoy.yaml
CMD /usr/local/bin/envoy -c /etc/envoy.yaml