## Diagram 

![](/images/diagram.jpg)

## Install protoc
We need to install the [protoc](https://grpc.io/docs/protoc-installation/), before starting this project

```bash
$ apt install -y protobuf-compiler
$ protoc --version  # Ensure compiler version is 3+
```

## Run command to generate ts from proto file

```bash
$ pnpm proto:all
```

## Start postgres database

```bash
$ docker compose up -d 
```

## Start services at local

To run services at `local`, you need to open new terminal and run start command

For example start services `api-gateway`, `auth`, `order`, `product`

```bash
$ pnpm start:dev api-gateway
```

```bash
$ pnpm start:dev auth
```

```bash
$ pnpm start:dev order
```

```bash
$ pnpm start:dev product
```

## Start services at production

In production, i have build a docker compose file to start all the services

T.B.D



