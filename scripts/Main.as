package
{
   import flash.display.Sprite;
   import flash.events.Event;
   import com.game.Game;
   import com.tool.UIEditor;
   
   [SWF(frameRate="30",backgroundColor="#FBF8EF",width="546",height="745")]
   public class Main extends Sprite
   {
      
      public static var _4399_function_score_id:String = "d8c8d4731a33a0a581edc746e73eadc7200";
      
      public static var serviceHold = null;
       
      
      public function Main()
      {
         super();
         if(stage)
         {
            this.init();
         }
         else
         {
            this.addEventListener(Event.ADDED_TO_STAGE,this.onAddToStage);
         }
      }
      
      private function onAddToStage(event:Event) : void
      {
         this.removeEventListener(Event.ADDED_TO_STAGE,this.onAddToStage);
         this.init();
      }
      
      private function init() : void
      {
         var game:Game = new Game(this.stage);
         UIEditor.init(this);
      }
      
      public function setHold(hold:*) : void
      {
         serviceHold = hold;
      }
   }
}
