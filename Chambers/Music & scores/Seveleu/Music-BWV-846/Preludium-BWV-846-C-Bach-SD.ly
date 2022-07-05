\version "2.20.0"

\paper {
  %ragged-last-bottom = ##f
  %line-width = 180
  #(set-paper-size "a4")
  left-margin = 3\cm
  right-margin = 3\cm
  top-margin = 1.5\cm
}


\header {
  title = \markup \center-column {"Добра тэмпераваны клавір" "Das Wohltemperierte Klavier" " "}
  subtitle = \markup \center-column { "Прэлюдыя 1 (до мажор)" "Praeludium 1 (C-dur), BWV 846" " "}
  composer = \markup \column \larger \bold { "Іаган Себасціян Бах" "Johann Sebastian Bach"}
  poet = \markup \with-url "https://music.seveleu.com" \column { \tiny "Апрацоўка: М. Севелеў-Дуброўнік" \tiny"Arr. by M. Seveleu-Dubrovnik"  } 

  tagline = \markup \with-url "https://music.seveleu.com" \column { \tiny "music.seveleu.com" " " } 
}

global = {
  \key c \major
  \time 4/4
}

Guitar = \relative c {
  \set fingeringOrientations = #'(left)
  \global
  % Music follows here.
  \override Score.BarNumber.self-alignment-X = #LEFT
  \override Score.BarNumber.break-visibility = ##(#t #t #t)
  \set Score.barNumberVisibility = #(every-nth-bar-number-visible 4)




  <c   e   g    c   e>1        %measure 1
  <c   d   a'   d   f>1        %measure 2
  <b   d   g    d'  f>1        %measure 3
  <c   e   g    c   e>1        %measure 4
  \override TextScript.extra-offset = #'(2 . -1.5)
  <c-2 e-1 a-1  e'-4 a-4>1^\markup\tiny \left-column{"барэ" \vspace #-0.5 \concat{II\sub{④} V\sub{②}}}%measure 5
  \override TextScript.extra-offset = #'(4 . 3) 
  < c-2 d fis-4 a-1 d-3>1-\markup { ")" }      %measure 6
  <b   d   g    d'   g>1        %measure 7
  \override TextScript.extra-offset = #'(4 . 2)
  <b-2 c-3 e-2  g   c-1>1-\markup { ")" }        %measure 8
  \override TextScript.extra-offset = #'(3 . 2.5) 
  <a   c   e    g   c>1-\markup { ")" }        %measure 9
  <fis a   d    a'  c>1        %measure 10
  <g-4   b-2   d    g   b>1        %measure 11
  <g-4 bes-1 e-2    g   cis-3>1        %measure 12
  <f-1   a   d    a'-2   d-3>1        %measure 13
 <f-1   b-3  d   aes'-2  b>1         %measure 14
  <e   c'-4  e-3    g    c-1>1        %measure 15
  \override TextScript.extra-offset = #'(0.5 . -2)
  <e   f'-4   a-3    c-1   f-1>1^\markup\tiny \concat{"б " I \sub{②}}    %measure 16
  \override TextScript.extra-offset = #'(0.5 . -.7)
  <f-2   d'  a'-3    c-1   f-1>1^\markup\tiny \concat{"б " I \sub{②}}        %measure 17
  <g-4 d'   g    b   f'-1>1        %measure 18
  <c-3-4 e-2   g    c   e-1>1        %measure 19
  \override TextScript.extra-offset = #'(4 . 4.4) 
  <c-3   g'   bes-4  c-1   e>1-\markup { ")" }        %measure 20
  <f,-1 f'-4 a-3  c-2 e>1        %measure 21
  <fis-1 a fis'-2 c'-4 es-3>1        %measure 22
  \override TextScript.extra-offset = #'(0.5 . -0.5)
  \hideNotes \grace e'^\markup\tiny \concat{"б " III \sub{"④ ці ⑥"}}\unHideNotes
  \override TextScript.extra-offset = #'(4 . 5.8) 
  <aes,-2 f'-1 b-2 c-3 d-1>1-\markup { ")" }      %measure 23
  \override TextScript.extra-offset = #'(2.3 . -1.9)
  \grace s^\markup\tiny \concat{"б " III \sub{⑥}}
  \override TextScript.extra-offset = #'(4 . 5) 
  <g-1 f'-1 g-3 b-2 d-1>1-\markup { ")" }        %measure 24
  <g   e'   g    c   e>1        %measure 25
  \override TextScript.extra-offset = #'(0 . -0.9)
  <g   d'   g   c-1 f-1>1^\markup\tiny \concat{"б " I \sub{②}}        %measure 26
  <g-4 d'   g   b   f'>1        %measure 27
  \override TextScript.extra-offset = #'(0. . -0.7)
  <g-4 es'-1 a-2 c-1 fis-3>1^\markup\tiny \concat{"б " I \sub{④}}        %measure 28
  <g-3   e'!   g   c   g'>1        %measure 29
  \override TextScript.extra-offset = #'(1 . -0.9)
  <g   d'   g   c-1 f-1>1^\markup\tiny \concat{"б " I \sub{②}}        %measure 30
  <g   d'   g    b   f'>1        %measure 31
  \override TextScript.extra-offset = #'(0.5 . -0.4)
  <g-1 c-1 g'-3 bes-1 e-4>1^\markup\tiny \concat{"б " III \sub{⑥}}        %measure 32
  \override TextScript.extra-offset = #'(0.4 . -0.7)
  <f-1   c'-3  \tweak font-size -3d f-4  a-2 c-1 \tweak font-size -3 f-1>1^\markup\tiny \concat{"б " I \sub{⑥}}        %measure 33
  \override TextScript.extra-offset = #'(2.3 . 7)
  <g-3  b-2 \tweak font-size -3d g b d-4 \tweak font-size -3 f-1>1-\markup { ")" }        %measure 34
  <e   c'-3   e-2   g   c-1>1        %measure 35
  \fermata
  \bar"|."
}


\score {
  \new Staff \with {
    midiInstrument = "acoustic guitar (nylon)"
    instrumentName =   \markup \center-column {"Гітара" "Guitar" }
  } { \clef "treble_8" \Guitar }
  
  \layout { }
  \midi {
    \tempo 4=100
  } 
}


start = \relative c {
  
  
  \set fingeringOrientations = #'(left)
  \global
  \override Score.BarNumber.self-alignment-X = #LEFT
  \override Score.BarNumber.break-visibility = ##(#f #f #f)
  
  % Music follows here.
  
  \set Score.currentBarNumber = #1
  <c   e   g    c   e>1        %measure 1
  \bar "||"
  << {\override TextScript.extra-offset = #'(2.5 . -14.3) \set strokeFingerOrientations = #'(up)\stemDown c16[\laissezVibrer\rightHandFinger #1 \sustainOn-\markup{"Пакінуць гучаць"} e16\laissezVibrer]\rightHandFinger #1 s8 s4 c16[\laissezVibrer e16]\laissezVibrer s8 s4} \\  {\override TextScript.extra-offset = #'(1.4 . -2) \set strokeFingerOrientations = #'(down)\stemUp s8 g16(\rightHandFinger #2 c\rightHandFinger #3 e)\rightHandFinger #4 g,(\rightHandFinger #2 c\rightHandFinger #3 e)\rightHandFinger #4 s8 g,16( c e) g,( c e)  \sustainOff-\markup{"Зняць"}} >> %measure 1
}
\markup {
  \column{
  \line{Акорды граюцца ў наступнай фігурацыі:}
  \line{The chords are played in the following figuration:}
}}



\score {
  \new Staff {  \clef "treble_8" \start}
  
  \layout {   indent = 0}
  \midi {
    \tempo 4=100
  } 
}


end = \relative c {
  
  
  
  \global
  \override Score.BarNumber.self-alignment-X = #LEFT
  \override Score.BarNumber.break-visibility = ##(#t #t #t)
  \override Score.BarNumber.break-visibility = #all-visible
  \set Score.barNumberVisibility = #all-bar-numbers-visible
  \set fingeringOrientations = #'(left)
  
  % Music follows here.
  \set Score.currentBarNumber = #32
  \hideNotes e1 \unHideNotes
  \bar "||"
  \set Score.currentBarNumber = #33
  << {f,1\sustainOn g\sustainOn <e\rightHandFinger #1 c'\rightHandFinger #1 e g c> \fermata} \\ {f'16\rest c8.~4~2 g'16\rest b,8.~4~2} \\ 	{ r8 f'16 a c f c a c a f a \slurDown f-4(\sustainOff d) f( d) r8 g16 b( d) f d( b) d( b) g b d, f-4 e-1 d\sustainOff} >> %measures 33-35
  \bar "|."
}
\markup {
  \column{
  \line{" "}
  \line{Кода граецца наступным чынам:}
  \line{The coda is played as follows:}
}}


\score {
  \new Staff {  \clef "treble_8" \end}
  
  \layout {   indent = 0}
  \midi {
    \tempo 4=100
  } 
}

modifications = \relative c, {
  
  
  \set fingeringOrientations = #'(left)
  \global
  
  
  \override Score.BarNumber.self-alignment-X = #LEFT
  \override Score.BarNumber.break-visibility = ##(#t #t #t)
  \override Score.BarNumber.break-visibility = #all-visible
  \set Score.barNumberVisibility = #all-bar-numbers-visible
  
  % Music follows here.
  \time 8/4
  
  
  
  \set Score.currentBarNumber = #9
  \hideNotes s1 s1 \unHideNotes
  \bar "||"
  \set Score.currentBarNumber = #10
  
  \set glissandoMap = #'((3 . 3))
  <fis a   d    fis c'>1 \glissando %measure 10
  <fis a   d    a'   c>1        %measure 10
  \set Score.currentBarNumber = #14
  \set glissandoMap = #'((1 . 3) (3 . 1))
  <f   aes d    f   b>1 \glissando %measure 14
  <f   b   d    aes'   b>1        %measure 14
  \set Score.currentBarNumber = #15
  \set glissandoMap = #'((1 . 3))
  <e   g   c    g'   c>1 \glissando %measure 15
  <e   c'  e    g    c>1        %measure 15
  \set Score.currentBarNumber = #16
  \set glissandoMap = #'((0 . 0))
  <e'   f   a    c   f>1 \glissando %measure 16
  <e,   f'   a    c   f>1        %measure 16
  \set Score.currentBarNumber = #17
  \set glissandoMap = #'((1 . 0))
  <d'   f   a    c   f>1 \glissando %measure 17
  <f,   d'  a'    c   f>1        %measure 17
  \set Score.currentBarNumber = #22
  \set glissandoMap = #'((1 . 2) (2 . 1))
  <fis c'   a'   c   es>1 \glissando  %measure 22
  <fis a   fis'   c'  es>1        %measure 22
  \set Score.currentBarNumber = #35
  \set glissandoMap = #'((0 . 0))
  <c'   e   g   c>1  \glissando  %measure 35
  <e,   c'   e   g   c>1         %measure 35  
  \bar"|."
}
\markup {
  \column{
  \line{Некаторыя акорды дзеля зручнейшай ігры мадуляваныя наступным чынам:}
  \line{Some chords have been modulated for smoother playing:}
}}

\score {
  \new Staff \with  { \omit TimeSignature } {  \clef "treble_8" \modifications}
  
  \layout {   indent = 0}
  \midi {
    \tempo 4=100
  } 
}

