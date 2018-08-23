module com {
	export module greensock {
		export module plugins {
			export class RemoveTintPlugin extends com.greensock.plugins.TintPlugin {
				public static API_static_com_greensock_plugins_RemoveTintPlugin:number;

				public constructor()
				{
					super();
					this.propName = "removeTint";
				}

			}
		}
	}
}

com.greensock.plugins.RemoveTintPlugin.API_static_com_greensock_plugins_RemoveTintPlugin = 1;
flash.extendsClass("com.greensock.plugins.RemoveTintPlugin","com.greensock.plugins.TintPlugin")
