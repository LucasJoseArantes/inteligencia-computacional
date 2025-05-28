package perceptron_digitos;
/**
 *
 * @author Clarimundo
 */
public class Aprendizagem {
    
    private double x[][]={{1,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1},
                          {1,0,1,0,1,1,0,0,1,0,0,1,0,1,1,1}};
   
    private double w[]= new double [16];
    private double t[]={1,-1};       
    private int epocas;
        
    public Aprendizagem(){  
        epocas=0;
    }
    
    public double [] getw(){
        return w;
    }
    
    public double [] gett(){
        return t;
    }    
    
    public int getepocas(){
        return epocas;
    }
    
    public double somatorio(int i){
        double yent=0;       
        for(int j=0;j<16;j++)
            yent = yent + x[i][j]*w[j];
        return yent;
    }

    public double saida(double yent, double limiar){
       double f;
       
        if(yent > limiar)
            f = 1;
        else 
            if(yent < -limiar)
                f = -1;          
            else
                f = 0;
       return f;
    }
    
    public void atualiza(double alfa, double f[]){
            for(int i=0;i<2;i++)
                for(int j=0; j<16; j++)
                     w[j] = w[j] + alfa * (t[i]-f[i]) * x[i][j];
    }
    
    public void algoritmo(double alfa, double limiar){
       double yent;
       double f[] = {0,0};
       boolean mudou;       
       
       for(int j=0;j<16;j++)  // zerar os pesos
               w[j]=0;       
       do{
           mudou=false;
           for(int i=0;i<2;i++){   // dois padrões de entrada (digito 0) e (digito 1)
              yent = somatorio(i);
              f[i] = saida(yent,limiar);
              if(f[i] != t[i])                  
                  mudou=true;
           }
           if(mudou==true)
              atualiza(alfa,f); 
           epocas++;
       }while(mudou==true);      
    }      
}
