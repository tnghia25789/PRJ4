/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fpt.aptech.PRJ.Entities;

import java.io.Serializable;
import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

/**
 *
 * @author ruava
 */
@Entity
@Table(name = "qa")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "Qa.findAll", query = "SELECT q FROM Qa q"),
    @NamedQuery(name = "Qa.findById", query = "SELECT q FROM Qa q WHERE q.id = :id"),
    @NamedQuery(name = "Qa.findByStatus", query = "SELECT q FROM Qa q WHERE q.status = :status"),
    @NamedQuery(name = "Qa.findByQuestion", query = "SELECT q FROM Qa q WHERE q.question = :question"),
    @NamedQuery(name = "Qa.findByAnswer", query = "SELECT q FROM Qa q WHERE q.answer = :answer"),
    @NamedQuery(name = "Qa.findByDatequestion", query = "SELECT q FROM Qa q WHERE q.datequestion = :datequestion"),
    @NamedQuery(name = "Qa.findByDateanswer", query = "SELECT q FROM Qa q WHERE q.dateanswer = :dateanswer")})
public class Qa implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "id")
    private Integer id;
    @Column(name = "status")
    private Boolean status;
    @Column(name = "question")
    private String question;
    @Column(name = "answer")
    private String answer;
    @Column(name = "datequestion")
    private String datequestion;
    @Column(name = "dateanswer")
    private String dateanswer;
    @JoinColumn(name = "adminid", referencedColumnName = "id")
    @ManyToOne
    private Admin adminid;
    @JoinColumn(name = "memberid", referencedColumnName = "id")
    @ManyToOne
    private Member1 memberid;
    @JoinColumn(name = "productid", referencedColumnName = "id")
    @ManyToOne
    private Product productid;

    public Qa() {
    }

    public Qa(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }

    public String getDatequestion() {
        return datequestion;
    }

    public void setDatequestion(String datequestion) {
        this.datequestion = datequestion;
    }

    public String getDateanswer() {
        return dateanswer;
    }

    public void setDateanswer(String dateanswer) {
        this.dateanswer = dateanswer;
    }

    public Admin getAdminid() {
        return adminid;
    }

    public void setAdminid(Admin adminid) {
        this.adminid = adminid;
    }

    public Member1 getMemberid() {
        return memberid;
    }

    public void setMemberid(Member1 memberid) {
        this.memberid = memberid;
    }

    public Product getProductid() {
        return productid;
    }

    public void setProductid(Product productid) {
        this.productid = productid;
    }

    @Override
    public int hashCode() {
        int hash = 0;
        hash += (id != null ? id.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof Qa)) {
            return false;
        }
        Qa other = (Qa) object;
        if ((this.id == null && other.id != null) || (this.id != null && !this.id.equals(other.id))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "fpt.aptech.PRJ.Entities.Qa[ id=" + id + " ]";
    }
    
}
