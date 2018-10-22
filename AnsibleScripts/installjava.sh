#!/bin/sh

sudo dnf -y install openjdk-8-jre
export JAVA_HOME=$(/usr/lib/jvm/java-8-openjdk-amd64/)
export PATH=$JAVA_HOME/bin:$PATH
