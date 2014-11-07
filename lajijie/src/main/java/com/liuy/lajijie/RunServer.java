package com.liuy.lajijie;



public class RunServer {

	/**
	 * 这是用于你调试程序或者运行于Jetty模式下的入口地址�?
	 * @param args
	 * @throws Exception 
	 */
	public static void main(String[] args) throws Exception {
		System.out.println(System.getProperties());
		cn.quickj.Main.runserver("",80);
	}

}
