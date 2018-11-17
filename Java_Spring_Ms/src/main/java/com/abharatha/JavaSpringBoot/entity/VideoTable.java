package com.abharatha.JavaSpringBoot.entity;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_EMPTY)
public class VideoTable {

	private String videoTbId;
	private String videoName;
	private String videoDesc;
	private String videoLink;
	private Integer uploadedBy;
	private Integer views;
	private String thumbnail;
	private String category;

	public VideoTable() {
		super();
	}

	public VideoTable(String videoTbId, String videoName, String videoDesc, String videoLink, Integer uploadedBy,
			Integer views, String thumbnail, String category) {
		super();
		this.videoTbId = videoTbId;
		this.videoName = videoName;
		this.videoDesc = videoDesc;
		this.videoLink = videoLink;
		this.uploadedBy = uploadedBy;
		this.views = views;
		this.thumbnail = thumbnail;
		this.category = category;
	}

	public String getVideoTbId() {
		return videoTbId;
	}

	public void setVideoTbId(String videoTbId) {
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

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "VideoTable [videoTbId=" + videoTbId + ", videoName=" + videoName + ", videoDesc=" + videoDesc
				+ ", videoLink=" + videoLink + ", uploadedBy=" + uploadedBy + ", views=" + views + ", thumbnail="
				+ thumbnail + ", category=" + category + "]";
	}

}
