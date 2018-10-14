package com.abharatha.JavaSpringBoot.resource;

import java.util.List;

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

@RestController
@Order(Ordered.HIGHEST_PRECEDENCE)
@CrossOrigin(origins = "*")
@RequestMapping(path = "/search/")
public class VideoResource {

	@Autowired
	private VideoTableDao repository;

	@Autowired
	private HelloRabbitProducer helloRabbitProducer;

	@Order(Ordered.HIGHEST_PRECEDENCE)
	@CrossOrigin(origins = "*")
	@RequestMapping(method = RequestMethod.GET, path = "v1/{searchStr}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<VideoTable> searchVideos(@PathVariable("searchStr") String searchStr) {

		List<VideoTable> list = repository.findByPlaceContaining(searchStr);

		return list;

	}

	@RequestMapping(method = RequestMethod.GET, path = "video/{videoId}")
	public ResponseEntity<?> getUser(@PathVariable("videoId") Integer userId) throws JsonProcessingException {

		RecoQueueMessage message = new RecoQueueMessage(1, "fun");
		helloRabbitProducer.sendMessage(message);

	    return new ResponseEntity<>(null , HttpStatus.OK);
	}

}
