package com.abharatha.JavaSpringBoot.entity;

public class RecoQueueMessage {

	private String userId;
	private String category;

	public RecoQueueMessage(String userId, String category) {
		super();
		this.userId = userId;
		this.category = category;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	@Override
	public String toString() {
		return "RecoQueueMessage [userId=" + userId + ", category=" + category + "]";
	}

}
