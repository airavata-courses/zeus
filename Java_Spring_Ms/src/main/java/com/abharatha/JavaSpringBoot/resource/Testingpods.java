package com.abharatha.JavaSpringBoot.resource;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/")
public class Testingpods {

	@Order(Ordered.HIGHEST_PRECEDENCE)
	@CrossOrigin(origins = "*")
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public String searchVideos() {
		return "Testing pods";

	}
}
