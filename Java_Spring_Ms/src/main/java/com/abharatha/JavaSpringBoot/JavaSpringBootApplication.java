package com.abharatha.JavaSpringBoot;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.URL;

import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.CuratorFrameworkFactory;
import org.apache.curator.retry.ExponentialBackoffRetry;
import org.apache.zookeeper.CreateMode;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories("com.abharatha.JavaSpringBoot.dao")
public class JavaSpringBootApplication {

//	private static final Logger logger = LogManager.getLogger("com.abharatha.JavaSpringBoot");
	
	private static String zookeeperUrl;
	private static String zookeeperPort;
	private static final String PATH = "/zeus/java";
	private static String port;

	@Value("${server.port}")
	public void setPort(String value) {
		this.port = value;
	}

	@Value("${zookeeper.url}")
	public void setZkUrl(String value) {
		this.zookeeperUrl = value;
	}

	@Value("${zookeeper.port}")
	public void setZkPort(String value) {
		this.zookeeperPort = value;
	}

	public static void main(String[] args) {

		SpringApplication.run(JavaSpringBootApplication.class, args);
		try {
			registerInZookeeper(port);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	private static void registerInZookeeper(String port) throws Exception {

		CuratorFramework client = null;

		ExponentialBackoffRetry retryPolicy = new ExponentialBackoffRetry(1000, 3);
		client = CuratorFrameworkFactory.newClient(zookeeperUrl + ":" + zookeeperPort, retryPolicy);
		client.start();

		try {
			URL ipAddress = new URL("https://ip.42.pl/raw");
			BufferedReader in = new BufferedReader(new InputStreamReader(ipAddress.openStream()));
			String ip = in.readLine();
			String s = ip + ":" + port;
//			logger.debug(s);
			createParents(client, "/zeus/java", null);
			createNode(client, "/zeus/java/springBoot" + ip + port, s.getBytes());
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void createNode(CuratorFramework client, String path, byte[] payload) throws Exception {
		client.create().creatingParentsIfNeeded().withMode(CreateMode.EPHEMERAL).forPath(path, payload);
	}

	public static void createParents(CuratorFramework client, String path, byte[] payload) {
		try {
			client.create().creatingParentsIfNeeded().withMode(CreateMode.PERSISTENT).forPath("/zeus/java", payload);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
//			logger.debug("Parents already exists");
		}
	}

}
