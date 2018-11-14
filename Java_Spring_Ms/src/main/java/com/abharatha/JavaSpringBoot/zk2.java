package com.abharatha.JavaSpringBoot;

import java.util.Collection;
import java.util.List;
import java.util.Random;

import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.framework.api.BackgroundCallback;
import org.apache.curator.framework.api.CuratorEvent;
import org.apache.curator.framework.api.CuratorListener;
import org.apache.curator.retry.ExponentialBackoffRetry;
import org.apache.curator.retry.RetryNTimes;
import org.apache.curator.utils.CloseableUtils;
import org.apache.curator.x.discovery.ServiceDiscovery;
import org.apache.curator.x.discovery.ServiceDiscoveryBuilder;
import org.apache.curator.x.discovery.ServiceInstance;
import org.apache.curator.x.discovery.ServiceProvider;
import org.apache.curator.x.discovery.UriSpec;
import org.apache.zookeeper.CreateMode;
import org.apache.zookeeper.Watcher;
import org.apache.curator.x.discovery.ServiceInstance;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
public class zk2 {
	private static final Logger logger = LogManager.getLogger("com.abharatha.JavaSpringBoot");
	private static String zookeeperConnectionString = "149.165.170.230:2181";
    private static Random randomGenerator = new Random();
	private static final String PATH = "/zeus/java";
	
	public static void main(String[] args) throws Exception {

		CuratorFramework client = null;

		ExponentialBackoffRetry retryPolicy = new ExponentialBackoffRetry(1000, 3);
		client = CuratorFrameworkFactory.newClient(zookeeperConnectionString, retryPolicy);
		client.start();
		String path = "/zeus/java";
		List<String> instances = client.getChildren().forPath(path);
		logger.debug(instances.size());
		int index = randomGenerator.nextInt(instances.size());

		logger.debug(new String(client.getData().forPath(path+"/"+instances.get(index))));

	}

}