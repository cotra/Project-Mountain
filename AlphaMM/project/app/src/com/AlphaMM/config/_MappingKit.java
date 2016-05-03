package com.AlphaMM.config;

import com.AlphaMM.AdminWeb.model.awAdvs;
import com.AlphaMM.AdminWeb.model.awUsers;
import com.AlphaMM.CustomerMobile.model.cmAdvs;
import com.AlphaMM.CustomerMobile.model.cmGoods;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;

/**
 * Generated by JFinal, do not modify this file.
 * <pre>
 * Example:
 * public void configPlugin(Plugins me) {
 *     ActiveRecordPlugin arp = new ActiveRecordPlugin(...);
 *     _MappingKit.mapping(arp);
 *     me.add(arp);
 * }
 * </pre>
 */
public class _MappingKit {

	public static void mapping(ActiveRecordPlugin arp) {
		// AdminWeb
		arp.addMapping("users", "users_id", awUsers.class);
		arp.addMapping("advs", "advs_id", awAdvs.class);

		// CustomerMobile
		arp.addMapping("goods","goods_id", cmGoods.class);
		arp.addMapping("advs", "advs_id", cmAdvs.class);
	}
}

