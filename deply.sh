scp -r assets/* neeco@neec.ooo:yotsuka/
scp -r build/* neeco@neec.ooo:yotsuka/

ssh neeco@neec.ooo sh << EOF
cd yotsuka
dir -1 | xargs -I{} docker cp {} neeco_web-application_1:/usr/share/nginx/html/
EOF
