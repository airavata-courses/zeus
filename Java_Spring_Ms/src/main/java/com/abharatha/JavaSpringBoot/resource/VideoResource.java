package com.abharatha.JavaSpringBoot.resource;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.abharatha.JavaSpringBoot.dao.VideoTableDao;
import com.abharatha.JavaSpringBoot.entity.VideoTable;

@RestController
@Order(Ordered.HIGHEST_PRECEDENCE)
@CrossOrigin(origins = "http://localhost:3001")
@RequestMapping(path = "/search/v1")
public class VideoResource {

	@Autowired
	private VideoTableDao repository;

	@Order(Ordered.HIGHEST_PRECEDENCE)
	@CrossOrigin(origins = "http://localhost:3001")
	@RequestMapping(method = RequestMethod.GET, path = "{searchStr}", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<String> searchVideos(@PathVariable("searchStr") String searchStr) {

		List<VideoTable> list = repository.findByPlaceContaining(searchStr);
		List<String> l1 = new ArrayList<>();
		for (VideoTable videoTable : list) {
			l1.add(videoTable.getVideoName());
		}
		
		return l1;

	}

	// @RequestMapping(method = RequestMethod.GET, path = "{userId}")
	// public ResponseEntity<?> getUser(@PathVariable("userId") Integer userId) {
	// if (repository.findById(userId) != null) {
	// return ResponseEntity.ok(repository.findById(userId));
	// } else {
	// return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new
	// ErrorMessage("User not found!"));
	// }
	// }
	//
	// @RequestMapping(method = RequestMethod.POST, consumes =
	// MediaType.APPLICATION_JSON_VALUE, produces =
	// MediaType.APPLICATION_JSON_VALUE)
	// public ResponseEntity<?> insertUser(@RequestBody VideoTable user) {
	// VideoTable result = repository.save(user);
	// if (result != null) {
	// return ResponseEntity.ok("User added");
	// } else {
	// return ResponseEntity.badRequest().body(new ErrorMessage("Couldnt inser
	// user"));
	// }
	// }
	//
	// @RequestMapping(method = RequestMethod.PUT, path = "{userId}")
	// public ResponseEntity<Integer> updateUser(@PathVariable("userId") Integer
	// userId, @RequestBody VideoTable user) {
	// user.setUserId(userId);
	// if (repository.save(user) != null) {
	// return ResponseEntity.ok().build();
	// } else {
	// return ResponseEntity.badRequest().build();
	// }
	// }
	//
	// @RequestMapping(method = RequestMethod.DELETE, path = "{userId}")
	// private ResponseEntity<Integer> deleteUser(@PathVariable("userId") Integer
	// uuid) {
	// repository.deleteById(uuid);
	// return ResponseEntity.ok().build();
	//
	// }

}
