package com.abharatha.JavaSpringBoot;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.abharatha.JavaSpringBoot.dao.VideoTableDao;
import com.abharatha.JavaSpringBoot.entity.VideoTable;
import com.abharatha.JavaSpringBoot.resource.VideoResource;

@RunWith(SpringRunner.class)
@SpringBootTest(classes = JavaSpringBootApplication.class)
public class LearningSpringBootApplicationTests {

	private MockMvc mockMvc;

	@InjectMocks
	private VideoResource resource;

	@Mock
	private VideoTableDao service;

	@Before
	public void init() {
		MockitoAnnotations.initMocks(this);
		mockMvc = MockMvcBuilders.standaloneSetup(resource).build();

	}

	@Test
	public void testRepository() throws Exception {
		List<VideoTable> videos = new ArrayList<>();
		VideoTable video = new VideoTable();
		videos.add(video);
		VideoTableDao service = org.mockito.Mockito.mock(VideoTableDao.class);
//		when(service.findByPlaceContaining("surf")).thenReturn(videos);
//		assertEquals(1, service.findByPlaceContaining("surf").size());
	}

	@Test
	public void givenSearchStr_whenGetSearchVideos_thenExpectStatusOK() throws Exception {

		List<VideoTable> videos = new ArrayList<>();
		VideoTable video = new VideoTable();
		videos.add(video);

		VideoTableDao service = org.mockito.Mockito.mock(VideoTableDao.class);
//		when(service.findByPlaceContaining("surf")).thenReturn(videos);

//		mockMvc.perform(get("/search/v1/{searchStr}", "surf")).andExpect(status().isOk());

	}

}
