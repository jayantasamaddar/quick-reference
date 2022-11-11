# Uninstall awscli v1
sudo yum remove awscli -y
# Download and unzip awscliv2 install files
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
# Re-assign bin folder from /usr/local/bin to /usr/bin
sudo ~/aws/install -b /usr/bin
# Clean up install files
rm -rf ~/aws ~/awscliv2.zip