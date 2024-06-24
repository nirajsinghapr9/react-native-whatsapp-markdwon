# react-native-whatsapp-markdwon

*Description:*

This JavaScript library mimics WhatsApp's markdown behavior. It processes text with markdown escape characters as used in WhatsApp and outputs HTML with corresponding styling tags. You can then render this HTML using any HTML renderer library.

If you're interested in using it, here's how you can get started:

Input: Provide text formatted with markdown escape characters similar to WhatsApp's syntax.
Output: Receive HTML enriched with appropriate styling tags.
Rendering: Display the rendered HTML using your preferred HTML rendering library.

This library simplifies the process of converting WhatsApp-style markdown into HTML for seamless display in applications.

*How to use:* 

Install package using:


```npm i react-native-whatsapp-markdown```


```const markdownText= TextFormatter("*bold*")```


```<RenderHTML```
          ```contentWidth={metrics.screenWidth}```
          ```source={{html: markdownText}}```
          ```baseStyle={{color: NEW_COLORS.black80, fontSize: moderateScale(15)}}```
        ```>```
```</RenderHTML>```


*Example:-*



![image](https://github.com/nirajsinghapr9/react-native-whatsapp-markdwon/assets/66878464/51713310-4060-4d72-a3d1-d33a49cbe663)



