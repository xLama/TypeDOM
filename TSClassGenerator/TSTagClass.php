<?php
	class TSTagclass{
		
		private $className;
		private $classNameFirstUpper;
		private $classNameUpper;
		private $description;
		private $html5;
		private $deprecated;
		private $parentClass;
		private $HTMLElementClass;
		private $moreMethods;
		private $aditionalAttrMethods;
		private $interfaces;


		function  __construct($className,$description, $html5, $deprecated, $parentClass, $HTMLElementClass, $aditionalAttrMethods, $moreInterfaces,
		$moreMethods ){
		
			$this->className = $className;
			$this->description = $description;
			$this->html5 = $html5 == "+" ? "IHtml5" : "";
			$this->deprecated = $deprecated == "+" ? "IDeprecated" : "";
			$this->parentClass = $parentClass;
			$this->HTMLElementClass = $HTMLElementClass;
			$this->classNameFirstUpper = ucfirst($className);
			$this->classNameUpper = strtoupper($className);
			$this->moreMethods = $moreMethods;
			$this->aditionalAttrMethods = $aditionalAttrMethods;
		
			if ($this->html5 != "" ||  $this->deprecated != "" || $moreInterfaces != ""){
				$this->interfaces = "implements ".$this->html5." ".$this->deprecated." ".$moreInterfaces;
			}
		}
		
		private function generateAttrMethods(){
			$attributes = explode(",",$this->aditionalAttrMethods);
			$methods = "";

			if (!empty($attributes[0])){
				foreach ($attributes as $attribute){
					$nameAndType = explode("-",$attribute);
					$attribueName = $nameAndType[0];
					$attributeType = $nameAndType[1];
					$attributeFirstUpper = ucfirst($attribueName);
				
					$methods = "
	public get".$attributeFirstUpper."() : ".$attributeType." {
		return this.getElement().".$attribueName.";
	}
		
	public set".$attributeFirstUpper."(".$attribueName." : ".$attributeType.") : ".$this->classNameFirstUpper."{
		this.getElement().".$attribueName." = ".$attribueName.";
		return this;
	}";
				}		
			}
			return $methods;
		}
		
		
		public function generateClass($license){
		
		$classText =
"".$license."

/**
 * The {{#crossLink \"".$this->classNameFirstUpper."\"}}{{/crossLink}} ".$this->description."
 *
 * @class ".$this->classNameFirstUpper."
 * @extends ".$this->parentClass."
 * @constructor
 **/
class ".$this->classNameFirstUpper." extends ".$this->parentClass."<".$this->classNameFirstUpper.", ".$this->HTMLElementClass."> ".$this->interfaces." 
{
	public static ".$this->classNameUpper.": string = '".$this->className."';
		
	constructor();
	constructor(id: string)
	constructor(attributes: Object)
	constructor(element: ".$this->HTMLElementClass.")
	constructor(idOrAttributesOrElement?: any) {
		super(idOrAttributesOrElement, ".$this->classNameFirstUpper.".".$this->classNameUpper.");
	}	
";
	$classText .= $this->generateAttrMethods(); // Attrs setter and getters
	$classText .= $this->moreMethods;
	$classText .= 
"	
}";

return $classText;

	}	// Fin generateClass
	
	
	
	public function getHTMLElementClass(){
		return $this->HTMLElementClass;
	}
		
	public function getClassNameFirstUpper(){
		return $this->classNameFirstUpper;
	}
	
} // Fin TSClass
?>

