package com.liuy.lajijie.filter;

import java.util.HashMap;

import cn.quickj.action.Action;
import cn.quickj.filter.ActionFilter;

public class AllowDomainFilter implements ActionFilter {

	public int after(Action action) {
		action.getResponse().setHeader("Access-Control-Allow-Origin", "*");
		return 0;
	}

	public int before(Action action) {
		return ActionFilter.NEED_PROCESS;
	}

	public void init(HashMap<String, String> params) {

	}
}
