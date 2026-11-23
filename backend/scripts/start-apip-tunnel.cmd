@echo off
setlocal
if not exist "%~dp0..\..\.local" mkdir "%~dp0..\..\.local"
echo Connecting to the APIP database through SSH. Keep this window open.
ssh -N -L 127.0.0.1:13307:127.0.0.1:3306 -o ExitOnForwardFailure=yes -o ServerAliveInterval=30 -o ServerAliveCountMax=3 -o StrictHostKeyChecking=accept-new -o UserKnownHostsFile="%~dp0..\..\.local\apip_known_hosts" aoudi@37.59.135.234
