package com.abharatha.JavaSpringBoot.resource;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.ResponseEntity.BodyBuilder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.abharatha.JavaSpringBoot.RabbitProducer.HelloRabbitProducer;
import com.abharatha.JavaSpringBoot.dao.VideoTableDao;
import com.abharatha.JavaSpringBoot.entity.RecoQueueMessage;
import com.abharatha.JavaSpringBoot.entity.VideoTable;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@RestController
@Order(Ordered.HIGHEST_PRECEDENCE)
@CrossOrigin(origins = "*")
@RequestMapping(path = "/search/")
public class VideoResource {

	private static final Logger logger = LogManager.getLogger("com.abharatha.JavaSpringBoot");

	@Autowired
	private VideoTableDao repository;
	private static int count;
	@Autowired
	private HelloRabbitProducer helloRabbitProducer;

	@Order(Ordered.HIGHEST_PRECEDENCE)
	@CrossOrigin(origins = "*")
	@RequestMapping(method = RequestMethod.GET, path = "v1/{searchStr}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Map<String, Object>> searchVideos(@PathVariable("searchStr") String searchStr) {
		count++;
		return repository.getVideoByNames(searchStr);

	}

	@Order(Ordered.HIGHEST_PRECEDENCE)
	@CrossOrigin(origins = "*")
	@RequestMapping(method = RequestMethod.GET, path = "v2", produces = MediaType.APPLICATION_JSON_VALUE)
	public String getCount() {
		return "Total no. of times /search/v1/{searchstr} is " + count;
	}

	@RequestMapping(method = RequestMethod.GET, path = "video/{userId}/{category}")
	public ResponseEntity<?> getUser(@PathVariable("userId") String userId, @PathVariable("category") String category)
			throws JsonProcessingException {
		System.out.println("hi");
		RecoQueueMessage message = new RecoQueueMessage(userId, category);
		System.out.println(message);
		helloRabbitProducer.sendMessage(message);
		return new ResponseEntity<>(null, HttpStatus.OK);
	}

}
