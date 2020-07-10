# BBCStoreClient操作说明

1.**启动程序**
```
命令：node client.js
```

2.**创建数据文件**
```
命令：create [filepath]
功能：，使用随机数据填充固定大小，可用来上传ipfs保存
```

3.**保存文件**
```
命令：add [filepath]
功能：。该操作耗时较长，发送指令后请耐心等待结果。成功的结果包含sectorid，在后面的指令中用到。
```

4.**挑战时空证明**
```
命令：challenge [sectorid]
功能：对指定的sector挑战时空证明。该操作耗时较长，发送指令后请耐心等待结果。
```

5.**重新获取数据文件**
```
命令：get [sectorid] [localpath]
功能：重新获取指定文件，保存在指定路径。
```


