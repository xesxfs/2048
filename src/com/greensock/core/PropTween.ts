module com {
	export module greensock {
		export module core {
			export class PropTween extends egret.HashObject {
				public priority:number = 0;
				public start:number = NaN;
				public prevNode:com.greensock.core.PropTween;
				public change:number = NaN;
				public target:any;
				public name:string;
				public property:string;
				public nextNode:com.greensock.core.PropTween;
				public isPlugin:boolean = false;

				public constructor(target:any,property:string,start:number,change:number,name:string,isPlugin:boolean,nextNode:com.greensock.core.PropTween = null,priority:number = 0)
				{
					super();
					super();
					this.target = target;
					this.property = property;
					this.start = start;
					this.change = change;
					this.name = name;
					this.isPlugin = isPlugin;
					if(nextNode)
					{
						nextNode.prevNode = this;
						this.nextNode = nextNode;
					}
					this.priority = flash.checkInt(priority);
				}

			}
		}
	}
}

