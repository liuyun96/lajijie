package com.liuy.lajijie.action;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;

import cn.quickj.action.Action;

public class Html5Action extends Action {

	public void index(String uri) {
		render("html5/" + uri + ".html");
	}

	public void cache() {
		render("html5/cache.html");
	}

	public void cache1() {
		render("html5/cache1.html");
	}

	public void test() {
		render("html5/test.html");
	}

	public void simpleEvents() {
		// content type must be set to text/event-stream
		HttpServletResponse response = getResponse();
		// 开始发送事件流了
		getResponse().setContentType("text/event-stream");
		// encoding must be set to UTF-8
		response.setCharacterEncoding("UTF-8");
		PrintWriter writer;
		try {
			writer = response.getWriter();
			for (int i = 0; i < 10; i++) {
				writer.write("data: " + System.currentTimeMillis() + "\n\n");
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
		} catch (IOException e1) {
			e1.printStackTrace();
		}
	}

	public void MultipleEvents() {
		// content type must be set to text/event-stream
		HttpServletResponse response = getResponse();
		response.setContentType("text/event-stream");
		response.setCharacterEncoding("UTF-8");

		PrintWriter writer;
		try {
			writer = response.getWriter();
			int upVote = 0;
			int downVote = 0;
			for (int i = 0; i < 10; i++) {
				System.out.println("data:" + System.currentTimeMillis() + " i:"
						+ i);
				upVote = upVote + (int) (Math.random() * 10);
				downVote = downVote + (int) (Math.random() * 10);

				writer.write("event:up_vote\n");
				writer.write("data: " + upVote + "\n\n");

				writer.write("event:down_vote\n");
				writer.write("data: " + downVote + "\n\n");
				writer.flush();
				try {
					Thread.sleep(1000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			System.out.println("writer.close");
			writer.close();
		} catch (IOException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

	}
}
