package com.liuy.lajijie;

import java.util.ArrayList;
import java.util.Properties;

import cn.quickj.AbstractApplication;
import cn.quickj.annotation.Filter;

import com.google.inject.Module;

@Filter(name = "TimeFilter;StaticParamFilter;AllowDomainFilter")
public class Application extends AbstractApplication {
	@Override
	public void init(String rootPath) throws Exception {
		super.init(rootPath);
	}

	@Override
	public void onHibernateConfig(Properties properties) {
	}

	@Override
	public void onInitGuiceModules(ArrayList<Module> modules) {
	}

}
