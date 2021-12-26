#!/bin/sh

VERSION="0.13.3"

cp ../jsmrg.ytils.com/application.jsmrg.ytils.com/bin/Debug/netcoreapp3.1/application.jsmrg.ytils.com.dll ./build
cp ../jsmrg.ytils.com/application.jsmrg.ytils.com/bin/Debug/netcoreapp3.1/application.jsmrg.ytils.com.pdb ./build

./build/application.jsmrg.ytils.com ytils.yupput.js ytils.yupput-$VERSION.js

mv ./ytils.yupput-$VERSION.js ./dist
cp ./ytils.yupput.css ./dist/ytils.yupput-$VERSION.css

zip -j ./dist/com.ytils.yupput-$VERSION.zip ./dist/ytils.yupput-$VERSION.js ./dist/ytils.yupput-$VERSION.css
