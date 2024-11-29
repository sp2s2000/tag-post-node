
# HTTP Post for Zebra Reader Tag Data V1

### Quick Setup Web Server with Basic Auth

This is for demo purposes for setting up HTTP Web Server with Basic Authentication.

```txt
Note: This server is built on top of nodejs. (Nodejs v16+)
```



## API Reference

#### Tag Data Post/Publish
```http
  POST /tag-data
```

#### Preview Tag Data (Live)
```http
  GET /tag-view
```

## Environment Variables (.env)
#### Please change the environment variables )username and password) for security.
```txt
BASIC_AUTH_USER=admin
BASIC_AUTH_PASSWORD=supersecret
```

#### Quick Deployment on Railway.app for testing
You may fork this template and deploy on Railway quickly:

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/naLkNn?referralCode=zEKVel)
