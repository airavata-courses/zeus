package com.abharatha.JavaSpringBoot.resource;

import org.elasticsearch.search.SearchHit;
import org.springframework.web.bind.annotation.*;

import com.abharatha.JavaSpringBoot.dao.VideoTableDao;
import com.abharatha.JavaSpringBoot.entity.VideoTable;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/books")
public class VideoController {

	private VideoTableDao bookDao;

	public VideoController(VideoTableDao bookDao) {
		this.bookDao = bookDao;
	}

	@PostMapping
	public VideoTable insertBook(@RequestBody VideoTable book) throws Exception {
		return bookDao.insertVideo(book);
	}
}
