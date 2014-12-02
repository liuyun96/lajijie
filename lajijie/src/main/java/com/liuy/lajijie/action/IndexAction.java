package com.liuy.lajijie.action;

import cn.quickj.action.Action;

public class IndexAction extends Action {

	public void index() {
		render("index.html");
	}

	public void index(String uri) {
		render(uri + ".html");
	}
}
