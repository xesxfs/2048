package com.greensock.core
{
   import com.greensock.TweenLite;
   
   public class TweenCore
   {
      
      public static const version:Number = 1.693;
      
      protected static var _classInitted:Boolean;
       
      
      public var initted:Boolean;
      
      protected var _hasUpdate:Boolean;
      
      public var active:Boolean;
      
      protected var _delay:Number;
      
      public var cachedReversed:Boolean;
      
      public var nextNode:com.greensock.core.TweenCore;
      
      public var cachedTime:Number;
      
      protected var _rawPrevTime:Number = -1;
      
      public var vars:Object;
      
      public var cachedTotalTime:Number;
      
      public var data;
      
      public var timeline:com.greensock.core.SimpleTimeline;
      
      public var cachedOrphan:Boolean;
      
      public var cachedStartTime:Number;
      
      public var prevNode:com.greensock.core.TweenCore;
      
      public var cachedDuration:Number;
      
      public var gc:Boolean;
      
      public var cachedPauseTime:Number;
      
      public var cacheIsDirty:Boolean;
      
      public var cachedPaused:Boolean;
      
      public var cachedTimeScale:Number;
      
      public var cachedTotalDuration:Number;
      
      public function TweenCore(duration:Number = 0, vars:Object = null)
      {
         super();
         this.vars = vars != null?vars:{};
         if(this.vars.isGSVars)
         {
            this.vars = this.vars.vars;
         }
         this.cachedDuration = this.cachedTotalDuration = duration;
         _delay = Boolean(this.vars.delay)?Number(Number(this.vars.delay)):Number(0);
         this.cachedTimeScale = Boolean(this.vars.timeScale)?Number(Number(this.vars.timeScale)):Number(1);
         this.active = Boolean(duration == 0 && _delay == 0 && this.vars.immediateRender != false);
         this.cachedTotalTime = this.cachedTime = 0;
         this.data = this.vars.data;
         if(!_classInitted)
         {
            if(isNaN(TweenLite.rootFrame))
            {
               TweenLite.initClass();
               _classInitted = true;
            }
            else
            {
               return;
            }
         }
         var tl:com.greensock.core.SimpleTimeline = this.vars.timeline is SimpleTimeline?this.vars.timeline:Boolean(this.vars.useFrames)?TweenLite.rootFramesTimeline:TweenLite.rootTimeline;
         tl.insert(this,tl.cachedTotalTime);
         if(this.vars.reversed)
         {
            this.cachedReversed = true;
         }
         if(this.vars.paused)
         {
            this.paused = true;
         }
      }
      
      public function renderTime(time:Number, suppressEvents:Boolean = false, force:Boolean = false) : void
      {
      }
      
      public function get delay() : Number
      {
         return _delay;
      }
      
      public function get duration() : Number
      {
         return this.cachedDuration;
      }
      
      public function set reversed(b:Boolean) : void
      {
         if(b != this.cachedReversed)
         {
            this.cachedReversed = b;
            setTotalTime(this.cachedTotalTime,true);
         }
      }
      
      public function set startTime(n:Number) : void
      {
         if(this.timeline != null && (n != this.cachedStartTime || this.gc))
         {
            this.timeline.insert(this,n - _delay);
         }
         else
         {
            this.cachedStartTime = n;
         }
      }
      
      public function restart(includeDelay:Boolean = false, suppressEvents:Boolean = true) : void
      {
         this.reversed = false;
         this.paused = false;
         this.setTotalTime(!!includeDelay?Number(-_delay):Number(0),suppressEvents);
      }
      
      public function set delay(n:Number) : void
      {
         this.startTime = this.startTime + (n - _delay);
         _delay = n;
      }
      
      public function resume() : void
      {
         this.paused = false;
      }
      
      public function get paused() : Boolean
      {
         return this.cachedPaused;
      }
      
      public function play() : void
      {
         this.reversed = false;
         this.paused = false;
      }
      
      public function set duration(n:Number) : void
      {
         var ratio:Number = n / this.cachedDuration;
         this.cachedDuration = this.cachedTotalDuration = n;
         setDirtyCache(true);
         if(this.active && !this.cachedPaused && n != 0)
         {
            this.setTotalTime(this.cachedTotalTime * ratio,true);
         }
      }
      
      public function invalidate() : void
      {
      }
      
      public function complete(skipRender:Boolean = false, suppressEvents:Boolean = false) : void
      {
         if(!skipRender)
         {
            renderTime(this.totalDuration,suppressEvents,false);
            return;
         }
         if(this.timeline.autoRemoveChildren)
         {
            this.setEnabled(false,false);
         }
         else
         {
            this.active = false;
         }
         if(!suppressEvents)
         {
            if(this.vars.onComplete && this.cachedTotalTime >= this.cachedTotalDuration && !this.cachedReversed)
            {
               this.vars.onComplete.apply(null,this.vars.onCompleteParams);
            }
            else if(this.cachedReversed && this.cachedTotalTime == 0 && this.vars.onReverseComplete)
            {
               this.vars.onReverseComplete.apply(null,this.vars.onReverseCompleteParams);
            }
         }
      }
      
      public function get totalTime() : Number
      {
         return this.cachedTotalTime;
      }
      
      public function get startTime() : Number
      {
         return this.cachedStartTime;
      }
      
      public function get reversed() : Boolean
      {
         return this.cachedReversed;
      }
      
      public function set currentTime(n:Number) : void
      {
         setTotalTime(n,false);
      }
      
      protected function setDirtyCache(includeSelf:Boolean = true) : void
      {
         var tween:com.greensock.core.TweenCore = !!includeSelf?this:this.timeline;
         while(tween)
         {
            tween.cacheIsDirty = true;
            tween = tween.timeline;
         }
      }
      
      public function reverse(forceResume:Boolean = true) : void
      {
         this.reversed = true;
         if(forceResume)
         {
            this.paused = false;
         }
         else if(this.gc)
         {
            this.setEnabled(true,false);
         }
      }
      
      public function set paused(b:Boolean) : void
      {
         if(b != this.cachedPaused && this.timeline)
         {
            if(b)
            {
               this.cachedPauseTime = this.timeline.rawTime;
            }
            else
            {
               this.cachedStartTime = this.cachedStartTime + (this.timeline.rawTime - this.cachedPauseTime);
               this.cachedPauseTime = NaN;
               setDirtyCache(false);
            }
            this.cachedPaused = b;
            this.active = Boolean(!this.cachedPaused && this.cachedTotalTime > 0 && this.cachedTotalTime < this.cachedTotalDuration);
         }
         if(!b && this.gc)
         {
            this.setEnabled(true,false);
         }
      }
      
      public function kill() : void
      {
         setEnabled(false,false);
      }
      
      public function set totalTime(n:Number) : void
      {
         setTotalTime(n,false);
      }
      
      public function get currentTime() : Number
      {
         return this.cachedTime;
      }
      
      protected function setTotalTime(time:Number, suppressEvents:Boolean = false) : void
      {
         var tlTime:Number = NaN;
         var dur:Number = NaN;
         if(this.timeline)
         {
            tlTime = !!this.cachedPaused?Number(this.cachedPauseTime):Number(this.timeline.cachedTotalTime);
            if(this.cachedReversed)
            {
               dur = !!this.cacheIsDirty?Number(this.totalDuration):Number(this.cachedTotalDuration);
               this.cachedStartTime = tlTime - (dur - time) / this.cachedTimeScale;
            }
            else
            {
               this.cachedStartTime = tlTime - time / this.cachedTimeScale;
            }
            if(!this.timeline.cacheIsDirty)
            {
               setDirtyCache(false);
            }
            if(this.cachedTotalTime != time)
            {
               renderTime(time,suppressEvents,false);
            }
         }
      }
      
      public function pause() : void
      {
         this.paused = true;
      }
      
      public function set totalDuration(n:Number) : void
      {
         this.duration = n;
      }
      
      public function get totalDuration() : Number
      {
         return this.cachedTotalDuration;
      }
      
      public function setEnabled(enabled:Boolean, ignoreTimeline:Boolean = false) : Boolean
      {
         this.gc = !enabled;
         if(enabled)
         {
            this.active = Boolean(!this.cachedPaused && this.cachedTotalTime > 0 && this.cachedTotalTime < this.cachedTotalDuration);
            if(!ignoreTimeline && this.cachedOrphan)
            {
               this.timeline.insert(this,this.cachedStartTime - _delay);
            }
         }
         else
         {
            this.active = false;
            if(!ignoreTimeline && !this.cachedOrphan)
            {
               this.timeline.remove(this,true);
            }
         }
         return false;
      }
   }
}
