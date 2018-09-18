package com.abharatha.JavaSpringBoot.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "VIDEOTABLE")
public class VideoTable {

	@Id
	@Column(name = "VIDEOTBID")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer videoTbId;

	@Column(name = "VIDEONAME")
	private String videoName;

	@Column(name = "VIDEODESC")
	private String videoDesc;

	@Column(name = "VIDEOLINK")
	private String videoLink;

	@Column(name = "UPLOADEDBY")
	private Integer uploadedBy;

	@Column(name = "VIEWS")
	private Integer views;
	
	@Column(name = "THUMBNAIL")
	private String thumbnail;

	public VideoTable() {
		super();
	}

	public VideoTable(Integer videoTbId, String videoName, String videoDesc, String videoLink, Integer uploadedBy,
			Integer views, String thumbnail) {
		super();
		this.videoTbId = videoTbId;
		this.videoName = videoName;
		this.videoDesc = videoDesc;
		this.videoLink = videoLink;
		this.uploadedBy = uploadedBy;
		this.views = views;
		this.thumbnail = thumbnail;
	}

	public Integer getVideoTbId() {
		return videoTbId;
	}

	public void setVideoTbId(Integer videoTbId) {
		this.videoTbId = videoTbId;
	}

	public String getVideoName() {
		return videoName;
	}

	public void setVideoName(String videoName) {
		this.videoName = videoName;
	}

	public String getVideoDesc() {
		return videoDesc;
	}

	public void setVideoDesc(String videoDesc) {
		this.videoDesc = videoDesc;
	}

	public String getVideoLink() {
		return videoLink;
	}

	public void setVideoLink(String videoLink) {
		this.videoLink = videoLink;
	}

	public Integer getUploadedBy() {
		return uploadedBy;
	}

	public void setUploadedBy(Integer uploadedBy) {
		this.uploadedBy = uploadedBy;
	}

	public Integer getViews() {
		return views;
	}

	public void setViews(Integer views) {
		this.views = views;
	}

	public String getThumbnail() {
		return thumbnail;
	}

	public void setThumbnail(String thumbnail) {
		this.thumbnail = thumbnail;
	}

	@Override
	public String toString() {
		return "VideoTable [videoTbId=" + videoTbId + ", videoName=" + videoName + ", videoDesc=" + videoDesc
				+ ", videoLink=" + videoLink + ", uploadedBy=" + uploadedBy + ", views=" + views + ", thumbnail="
				+ thumbnail + "]";
	}
	
		
}
