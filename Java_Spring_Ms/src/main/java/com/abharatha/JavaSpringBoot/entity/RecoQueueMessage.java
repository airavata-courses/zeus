package com.abharatha.JavaSpringBoot.entity;

public class RecoQueueMessage {

	private Integer userId;
	private String category;

	public RecoQueueMessage(Integer userId, String category) {
		super();
		this.userId = userId;
		this.category = category;
	}

	public String getCategory() {
		return category;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "RecoQueueMessage [userId=" + userId + ", category=" + category + "]";
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

}
