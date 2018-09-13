package com.abharatha.JavaSpringBoot.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.abharatha.JavaSpringBoot.entity.VideoTable;


@Repository
public interface VideoTableDao extends JpaRepository<VideoTable, Integer> {

    @Query("Select c from VideoTable c where c.videoName like %:name%")
    List<VideoTable> findByPlaceContaining(@Param("name")String name);

//    List<Registration> findByPlaceIgnoreCaseContaining(String place);
    
}
