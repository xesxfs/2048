package com.greensock.core
{
   public class SimpleTimeline extends com.greensock.core.TweenCore
   {
       
      
      public var autoRemoveChildren:Boolean;
      
      protected var _lastChild:com.greensock.core.TweenCore;
      
      protected var _firstChild:com.greensock.core.TweenCore;
      
      public function SimpleTimeline(vars:Object = null)
      {
         super(0,vars);
      }
      
      public function get rawTime() : Number
      {
         return this.cachedTotalTime;
      }
      
      public function insert(tween:com.greensock.core.TweenCore, time:* = 0) : com.greensock.core.TweenCore
      {
         var prevTimeline:SimpleTimeline = tween.timeline;
         if(!tween.cachedOrphan && prevTimeline)
         {
            prevTimeline.remove(tween,true);
         }
         tween.timeline = this;
         tween.cachedStartTime = Number(time) + tween.delay;
         if(tween.gc)
         {
            tween.setEnabled(true,true);
         }
         if(tween.cachedPaused && prevTimeline != this)
         {
            tween.cachedPauseTime = tween.cachedStartTime + (this.rawTime - tween.cachedStartTime) / tween.cachedTimeScale;
         }
         if(_lastChild)
         {
            _lastChild.nextNode = tween;
         }
         else
         {
            _firstChild = tween;
         }
         tween.prevNode = _lastChild;
         _lastChild = tween;
         tween.nextNode = null;
         tween.cachedOrphan = false;
         return tween;
      }
      
      override public function renderTime(time:Number, suppressEvents:Boolean = false, force:Boolean = false) : void
      {
         var dur:Number = NaN;
         var next:com.greensock.core.TweenCore = null;
         var tween:com.greensock.core.TweenCore = _firstChild;
         this.cachedTotalTime = time;
         this.cachedTime = time;
         while(tween)
         {
            next = tween.nextNode;
            if(tween.active || time >= tween.cachedStartTime && !tween.cachedPaused && !tween.gc)
            {
               if(!tween.cachedReversed)
               {
                  tween.renderTime((time - tween.cachedStartTime) * tween.cachedTimeScale,suppressEvents,false);
               }
               else
               {
                  dur = !!tween.cacheIsDirty?Number(tween.totalDuration):Number(tween.cachedTotalDuration);
                  tween.renderTime(dur - (time - tween.cachedStartTime) * tween.cachedTimeScale,suppressEvents,false);
               }
            }
            tween = next;
         }
      }
      
      public function remove(tween:com.greensock.core.TweenCore, skipDisable:Boolean = false) : void
      {
         if(tween.cachedOrphan)
         {
            return;
         }
         if(!skipDisable)
         {
            tween.setEnabled(false,true);
         }
         if(tween.nextNode)
         {
            tween.nextNode.prevNode = tween.prevNode;
         }
         else if(_lastChild == tween)
         {
            _lastChild = tween.prevNode;
         }
         if(tween.prevNode)
         {
            tween.prevNode.nextNode = tween.nextNode;
         }
         else if(_firstChild == tween)
         {
            _firstChild = tween.nextNode;
         }
         tween.cachedOrphan = true;
      }
   }
}
