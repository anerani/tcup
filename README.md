# tcup
A simple TCP to UNIX socket proxy.


TCUP is just a simple networking app to act as a proxy between TCP socket and UNIX socket for
development purposes. You can e.g. develop your own application that listens to an UNIX socket
and get access to that using your browser.

To get started:
```bash
npm install
iojs tcup.js --help
```

Note: This app is not recommended for production environments, just for development purposes.
