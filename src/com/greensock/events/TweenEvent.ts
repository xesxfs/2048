module com {
	export module greensock {
		export module events {
			export class TweenEvent extends egret.Event {
				public static COMPLETE_static_com_greensock_events_TweenEvent:string;
				public static START:string;
				public static UPDATE:string;
				public static REVERSE_COMPLETE:string;
				public static INIT_static_com_greensock_events_TweenEvent:string;
				public static VERSION:number;
				public static REPEAT:string;

				public constructor(type:string,bubbles:boolean = false,cancelable:boolean = false)
				{
					super(type,bubbles,cancelable);
				}

				public clone():egret.Event
				{
					return new com.greensock.events.TweenEvent(this.type,this.bubbles,this.cancelable);
				}

			}
		}
	}
}

com.greensock.events.TweenEvent.COMPLETE_static_com_greensock_events_TweenEvent = "complete";
com.greensock.events.TweenEvent.START = "start";
com.greensock.events.TweenEvent.UPDATE = "change";
com.greensock.events.TweenEvent.REVERSE_COMPLETE = "reverseComplete";
com.greensock.events.TweenEvent.INIT_static_com_greensock_events_TweenEvent = "init";
com.greensock.events.TweenEvent.VERSION = 1.1;
com.greensock.events.TweenEvent.REPEAT = "repeat";
flash.extendsClass("com.greensock.events.TweenEvent","egret.Event")
