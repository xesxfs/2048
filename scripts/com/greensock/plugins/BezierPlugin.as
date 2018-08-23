package com.greensock.plugins
{
   import com.greensock.TweenLite;
   
   public class BezierPlugin extends TweenPlugin
   {
      
      public static const API:Number = 1;
      
      protected static const _RAD2DEG:Number = 180 / Math.PI;
       
      
      protected var _future:Object;
      
      protected var _orient:Boolean;
      
      protected var _orientData:Array;
      
      protected var _target:Object;
      
      protected var _beziers:Object;
      
      public function BezierPlugin()
      {
         _future = {};
         super();
         this.propName = "bezier";
         this.overwriteProps = [];
      }
      
      public static function parseBeziers(props:Object, through:Boolean = false) : Object
      {
         var i:int = 0;
         var a:Array = null;
         var b:Object = null;
         var p:* = null;
         var all:Object = {};
         if(through)
         {
            for(p in props)
            {
               a = props[p];
               all[p] = b = [];
               if(a.length > 2)
               {
                  b[b.length] = [a[0],a[1] - (a[2] - a[0]) / 4,a[1]];
                  for(i = 1; i < a.length - 1; i = i + 1)
                  {
                     b[b.length] = [a[i],a[i] + (a[i] - b[i - 1][1]),a[i + 1]];
                  }
               }
               else
               {
                  b[b.length] = [a[0],(a[0] + a[1]) / 2,a[1]];
               }
            }
         }
         else
         {
            for(p in props)
            {
               a = props[p];
               all[p] = b = [];
               if(a.length > 3)
               {
                  b[b.length] = [a[0],a[1],(a[1] + a[2]) / 2];
                  for(i = 2; i < a.length - 2; i = i + 1)
                  {
                     b[b.length] = [b[i - 2][2],a[i],(a[i] + a[i + 1]) / 2];
                  }
                  b[b.length] = [b[b.length - 1][2],a[a.length - 2],a[a.length - 1]];
               }
               else if(a.length == 3)
               {
                  b[b.length] = [a[0],a[1],a[2]];
               }
               else if(a.length == 2)
               {
                  b[b.length] = [a[0],(a[0] + a[1]) / 2,a[1]];
               }
            }
         }
         return all;
      }
      
      override public function killProps(lookup:Object) : void
      {
         var p:* = null;
         for(p in _beziers)
         {
            if(p in lookup)
            {
               delete _beziers[p];
            }
         }
         super.killProps(lookup);
      }
      
      protected function init(tween:TweenLite, beziers:Array, through:Boolean) : void
      {
         var i:int = 0;
         var p:* = null;
         var killVarsLookup:Object = null;
         _target = tween.target;
         var enumerables:Object = tween.vars.isTV == true?tween.vars.exposedVars:tween.vars;
         if(enumerables.orientToBezier == true)
         {
            _orientData = [["x","y","rotation",0,0.01]];
            _orient = true;
         }
         else if(enumerables.orientToBezier is Array)
         {
            _orientData = enumerables.orientToBezier;
            _orient = true;
         }
         var props:Object = {};
         for(i = 0; i < beziers.length; i = i + 1)
         {
            for(p in beziers[i])
            {
               if(props[p] == undefined)
               {
                  props[p] = [tween.target[p]];
               }
               if(typeof beziers[i][p] == "number")
               {
                  props[p].push(beziers[i][p]);
               }
               else
               {
                  props[p].push(tween.target[p] + Number(beziers[i][p]));
               }
            }
         }
         for(this.overwriteProps[this.overwriteProps.length] in props)
         {
            if(enumerables[p] != undefined)
            {
               if(typeof enumerables[p] == "number")
               {
                  props[p].push(enumerables[p]);
               }
               else
               {
                  props[p].push(tween.target[p] + Number(enumerables[p]));
               }
               killVarsLookup = {};
               killVarsLookup[p] = true;
               tween.killVars(killVarsLookup,false);
               delete enumerables[p];
            }
         }
         _beziers = parseBeziers(props,through);
      }
      
      override public function onInitTween(target:Object, value:*, tween:TweenLite) : Boolean
      {
         if(!(value is Array))
         {
            return false;
         }
         init(tween,value as Array,false);
         return true;
      }
      
      override public function set changeFactor(n:Number) : void
      {
         var i:int = 0;
         var p:* = null;
         var b:Object = null;
         var t:Number = NaN;
         var segments:int = 0;
         var val:Number = NaN;
         var curVals:Object = null;
         var dx:Number = NaN;
         var dy:Number = NaN;
         var cotb:Array = null;
         var toAdd:Number = NaN;
         var oldTarget:Object = null;
         var oldRound:Boolean = false;
         _changeFactor = n;
         if(n == 1)
         {
            for(p in _beziers)
            {
               i = _beziers[p].length - 1;
               _target[p] = _beziers[p][i][2];
            }
         }
         else
         {
            for(p in _beziers)
            {
               segments = _beziers[p].length;
               if(n < 0)
               {
                  i = 0;
               }
               else if(n >= 1)
               {
                  i = segments - 1;
               }
               else
               {
                  i = segments * n >> 0;
               }
               t = (n - i * (1 / segments)) * segments;
               b = _beziers[p][i];
               if(this.round)
               {
                  val = b[0] + t * (2 * (1 - t) * (b[1] - b[0]) + t * (b[2] - b[0]));
                  if(val > 0)
                  {
                     _target[p] = val + 0.5 >> 0;
                  }
                  else
                  {
                     _target[p] = val - 0.5 >> 0;
                  }
               }
               else
               {
                  _target[p] = b[0] + t * (2 * (1 - t) * (b[1] - b[0]) + t * (b[2] - b[0]));
               }
            }
         }
         if(_orient)
         {
            i = _orientData.length;
            curVals = {};
            while(i--)
            {
               cotb = _orientData[i];
               curVals[cotb[0]] = _target[cotb[0]];
               curVals[cotb[1]] = _target[cotb[1]];
            }
            oldTarget = _target;
            oldRound = this.round;
            _target = _future;
            this.round = false;
            _orient = false;
            i = _orientData.length;
            while(i--)
            {
               cotb = _orientData[i];
               this.changeFactor = n + (cotb[4] || 0.01);
               toAdd = Number(cotb[3]) || Number(0);
               dx = _future[cotb[0]] - curVals[cotb[0]];
               dy = _future[cotb[1]] - curVals[cotb[1]];
               oldTarget[cotb[2]] = Math.atan2(dy,dx) * _RAD2DEG + toAdd;
            }
            _target = oldTarget;
            this.round = oldRound;
            _orient = true;
         }
      }
   }
}
