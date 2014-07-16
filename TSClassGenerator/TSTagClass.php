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
		private $additionalInterfaces;
		private $moreInterfaces;
		private $moreMethods;
		private $aditionalAttrMethods;


		function  __construct($className,$description, $html5, $deprecated, $parentClass, $HTMLElementClass, $aditionalAttrMethods, $moreInterfaces,
		$moreMethods ){
		
			$this->className = $className;
			$this->description = $description;
			$this->html5 = $html5 == "+" ? ",IHtml5" : "";
			$this->deprecated = $deprecated == "+" ? ",IDeprecated" : "";
			$this->parentClass = $parentClass;
			$this->HTMLElementClass = $HTMLElementClass;
			$this->classNameFirstUpper = ucfirst($className);
			$this->classNameUpper = strtoupper($className);
			$this->additionalInterfaces .= $this->html5.$this->deprecated;
			$this->moreInterfaces = $moreInterfaces;
			$this->moreMethods = $moreMethods;
			$this->aditionalAttrMethods = $aditionalAttrMethods;
			
		}
		
		public function getHTMLElementClass(){
			return $this->HTMLElementClass;
		}
		
		public function getClassNameFirstUpper(){
			return $this->classNameFirstUpper;
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
		
		
		public function generateClass(){
		
		$classText =
"/*
* Copyright (c) 2014 Jose Carlos Lama. www.typedom.org
*
* Permission is hereby granted, free of charge, to any person
* obtaining a copy of this software and associated documentation
* files (the \"Software\"), to deal in the Software without restriction,
* including without limitation the rights to use, copy, modify, merge,
* publish, distribute, sublicense, and/or sell copies of the Software,
* and to permit persons to whom the Software is furnished to do so,
* subject to the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED \"AS IS\", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
* OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
* FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
* OR OTHER DEALINGS IN THE SOFTWARE.
*/ 

/**
*".$this->description."
**/

	class ".$this->classNameFirstUpper." extends ".$this->parentClass."<".$this->classNameFirstUpper."> implements ICloneable<".$this->classNameFirstUpper.">".$this->additionalInterfaces." ".$this->moreInterfaces." 
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


		if ($this->HTMLElementClass != "HTMLElement"){
			$classText .= 

"		public setElement(element: ".$this->HTMLElementClass."): ".$this->classNameFirstUpper." {
			super.setElement(element);
			return this;
		}
		
		public getElement(): ".$this->HTMLElementClass." {
			return <".$this->HTMLElementClass.">super.getElement();
		}
";
}

		$classText .= $this->generateAttrMethods(); // Attrs setter and getters
		$classText .= $this->moreMethods;
		$classText .= 
"	
	}";

return $classText;

	}	// Fin generateClass
	
} // Fin TSClass
?>

