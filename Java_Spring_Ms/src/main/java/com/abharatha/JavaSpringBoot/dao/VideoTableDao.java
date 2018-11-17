package com.abharatha.JavaSpringBoot.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.elasticsearch.ElasticsearchException;
import org.elasticsearch.action.delete.DeleteRequest;
import org.elasticsearch.action.delete.DeleteResponse;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.action.update.UpdateRequest;
import org.elasticsearch.action.update.UpdateResponse;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.SearchHit;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.springframework.stereotype.Repository;

import com.abharatha.JavaSpringBoot.entity.VideoTable;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

//@Repository
//public interface VideoTableDao extends JpaRepository<VideoTable, Integer> {
//
//    @Query("Select c from VideoTable c where c.videoName like %:name%")
//    List<VideoTable> findByPlaceContaining(@Param("name")String name);
//
////    List<Registration> findByPlaceIgnoreCaseContaining(String place);
//    
//}
//

@Repository
public class VideoTableDao {

	private final String INDEX = "videosdata";
	private final String TYPE = "videos";

	private RestHighLevelClient restHighLevelClient;

	private ObjectMapper objectMapper;

	public VideoTableDao(ObjectMapper objectMapper, RestHighLevelClient restHighLevelClient) {
		this.objectMapper = objectMapper;
		this.restHighLevelClient = restHighLevelClient;
	}

	public VideoTable insertVideo(VideoTable video) {
		video.setVideoTbId(UUID.randomUUID().toString());
		Map<String, Object> dataMap = objectMapper.convertValue(video, Map.class);
		IndexRequest indexRequest = new IndexRequest(INDEX, TYPE, video.getVideoTbId()).source(dataMap);
		try {
			IndexResponse response = restHighLevelClient.index(indexRequest);
		} catch (ElasticsearchException e) {
			e.getDetailedMessage();
		} catch (java.io.IOException ex) {
			ex.getLocalizedMessage();
		}
		return video;
	}

	public Map<String, Object> getVideoById(String id) {
		GetRequest getRequest = new GetRequest(INDEX, TYPE, id);
		GetResponse getResponse = null;
		try {
			getResponse = restHighLevelClient.get(getRequest);
		} catch (java.io.IOException e) {
			e.getLocalizedMessage();
		}
		Map<String, Object> sourceAsMap = getResponse.getSourceAsMap();
		return sourceAsMap;
	}

	public List<Map<String, Object>> getVideoByNames(String names) {
		SearchRequest searchRequest = new SearchRequest();
		SearchSourceBuilder searchSourceBuilder = new SearchSourceBuilder();
		BoolQueryBuilder boolQueryBuilder = QueryBuilders.boolQuery();
		String searchStr = "*"+names+"*".toLowerCase();
		boolQueryBuilder.must(QueryBuilders.wildcardQuery("videoName", searchStr));
		searchSourceBuilder.query(boolQueryBuilder);
		searchRequest.source(searchSourceBuilder);

		SearchResponse getResponse = null;
		try {
			getResponse = restHighLevelClient.search(searchRequest);

		} catch (java.io.IOException e) {
			e.getLocalizedMessage();
		}
		SearchHit[] searchHits = getResponse.getHits().getHits();
		List<Map<String, Object>> response = new ArrayList<>();
		for (SearchHit hit : searchHits) {
			Map<String, Object> sourceAsMap = hit.getSourceAsMap();
			response.add(sourceAsMap);
		}

		return response;
	}

	public Map<String, Object> updateBookById(String id, VideoTable video) {
		UpdateRequest updateRequest = new UpdateRequest(INDEX, TYPE, id).fetchSource(true); // Fetch Object after its
																							// update
		Map<String, Object> error = new HashMap<>();
		error.put("Error", "Unable to update video");
		try {
			String bookJson = objectMapper.writeValueAsString(video);
			updateRequest.doc(bookJson, XContentType.JSON);
			UpdateResponse updateResponse = restHighLevelClient.update(updateRequest);
			Map<String, Object> sourceAsMap = updateResponse.getGetResult().sourceAsMap();
			return sourceAsMap;
		} catch (JsonProcessingException e) {
			e.getMessage();
		} catch (java.io.IOException e) {
			e.getLocalizedMessage();
		}
		return error;
	}

	public void deleteBookById(String id) {
		DeleteRequest deleteRequest = new DeleteRequest(INDEX, TYPE, id);
		try {
			DeleteResponse deleteResponse = restHighLevelClient.delete(deleteRequest);
		} catch (java.io.IOException e) {
			e.getLocalizedMessage();
		}
	}

}
