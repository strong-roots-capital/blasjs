      PROGRAM dsbmvcase0
      
      EXTERNAL DSBMV

      CHARACTER UPLO
      INTEGER N,K, LDA,INCX,INCY 
      DOUBLE PRECISION ALPHA, BETA, Y(6), X(6)
      DOUBLE PRECISION A(6,6)

      DATA   ((A(I,J), I=1,6), J=1,6)/0.42224244493991137,
     c  -0.7566161579452455, -0.5090229720808566,
     c  -0.7133912411518395, -0.5207411698065698, -0.8821312454529107,
     c  0.7525384253822267, 0.5578293548896909, 0.5946176517754793,
     c -0.08945109276100993, -0.17983183590695262, 0,
     c  0.3094478561542928, -0.29360545612871647, -0.459479708224535,
     c  0.9853681223466992, 0, 0,
     c -0.0437639313749969, 0.8481489396654069, 0.19752193428575993,
     c 0, 0, 0,
     c -0.703576878644526, -0.9738448490388691, 0,
     c 0, 0, 0,
     c -0.008812844287604094, 0, 0,
     c 0, 0, 0/

      DATA     (Y(I),I=1,6)/
     + -0.17262350264585732,
     + -2.2239002740099374,
     + -1.263614384970583,
     + 0.3587288959713519,
     + -0.011045478465663564,
     + -0.9406491626186084/
     
      DATA     (X(I),I=1,6)/
     + -0.17262350264585732,
     + -2.2239002740099374,
     + -1.263614384970583,
     + 0.3587288959713519,
     + -0.011045478465663564,
     + -0.9406491626186084/
     
      uplo = 'L'
      n = 6
      k = 5
      alpha = 0.75
      beta = 0.25
      lda = 6
      incx = 1
      incy = 1
    
      call DSBMV(UPLO, N, K, ALPHA, A, LDA, X, INCX, BETA, Y, INCY)
c     call DSBMV(UPLO,N,K,ALPHA,A,LDA,X,INCX,BETA,Y,INCY)
      print *,I,"|", Y
     
      end

     